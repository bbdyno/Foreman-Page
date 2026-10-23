// Renders the Android (Material) UI at tablet size (1280×800 dp) into docs/screens/ with real
// fonts, since Windows itself is only available in CI. Pretendard stands in
// for Segoe UI Variable + Malgun Gothic (macOS has neither).
//
//   CAPTURE=1 flutter test test/capture/fluent_capture_test.dart
import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:foreman/core/mock/mock_backend.dart';
import 'package:foreman/core/models.dart';
import 'package:foreman/core/store.dart';
import 'package:foreman/platform/billing.dart';
import 'package:foreman/state/app_state.dart';
import 'package:foreman/ui/material/material_root.dart';
import 'package:foreman/ui/material/shell.dart';
import 'package:provider/provider.dart';

final fontDirs = ['/Library/Fonts', '${Platform.environment['HOME']}/Library/Fonts'];

Future<void> loadFont(String family, List<String> files) async {
  final loader = FontLoader(family);
  for (final f in files) {
    if (f.startsWith('assets/')) {
      loader.addFont(rootBundle.load(f));
    } else {
      loader.addFont(Future.value(ByteData.sublistView(File(f).readAsBytesSync())));
    }
  }
  await loader.load();
}

String? fontFile(String name) {
  for (final d in fontDirs) {
    final f = File('$d/$name');
    if (f.existsSync()) return f.path;
  }
  return null;
}

void main() {
  testWidgets('capture Material tablet screens', (t) async {
    await t.runAsync(() async {
      final pre = ['Regular', 'Medium', 'SemiBold', 'Bold'].map((w) => fontFile('Pretendard-$w.otf')).whereType<String>().toList();
      if (pre.isEmpty) throw StateError('Pretendard not found in $fontDirs');
      // Pretendard stands in for Roboto + Noto Sans CJK KR (Android's system fonts are not on macOS).
      await loadFont('Roboto', pre);
      await loadFont('FlutterTest', pre);   // widgets without a theme font fall back to the test font
      await loadFont('Ahem', pre);
      await loadFont('JetBrains Mono', ['assets/fonts/JetBrainsMono-Regular.ttf', 'assets/fonts/JetBrainsMono-Medium.ttf']);
      await loadFont('PhosphorRegular', ['assets/fonts/Phosphor.ttf']);
      await loadFont('PhosphorFill', ['assets/fonts/Phosphor-Fill.ttf']);
      await loadFont('PhosphorBold', ['assets/fonts/Phosphor-Bold.ttf']);
    });
    t.view.physicalSize = const Size(2560, 1600);
    t.view.devicePixelRatio = 2;
    addTearDown(t.view.reset);

    for (final dark in [false, true]) {
      for (final page in ['home', 'inbox', 'session']) {
        final core = MockBackend(MockWorld(live: false));
        final app = AppState(
          backend: core,
          secure: MemoryStore(),
          prefs: MemoryStore(),
          deviceName: 'Pixel Tablet',
          platform: 'android',
          seedHosts: [
            for (final (id, name) in [(MockWorld.macMini, 'Mac mini'), (MockWorld.macbook, 'MacBook Pro'), (MockWorld.studio, 'Mac Studio')])
              HostRecord(hostId: id, hostname: name, hostKey: MockWorld.keyFor(id), lastSeen: DateTime.now().subtract(const Duration(minutes: 18))),
          ],
        );
        await t.runAsync(() async {
          await app.start();
          await Future<void>.delayed(const Duration(milliseconds: 1200));
        });
        app.settings.themeMode = dark ? ThemeMode.dark : ThemeMode.light;
        final key = GlobalKey();
        await t.pumpWidget(RepaintBoundary(
          key: key,
          child: MultiProvider(
            providers: [
              ChangeNotifierProvider.value(value: app),
              ChangeNotifierProvider<Billing>.value(value: NoBilling(demoProducts: true)),
            ],
            child: MaterialRoot(navigatorKey: GlobalKey()),
          ),
        ));
        for (var i = 0; i < 10; i++) {
          await t.pump(const Duration(milliseconds: 100));
        }
        // let the selected session subscribe and receive its conversation from the mock host
        for (var i = 0; i < 8; i++) {
          await t.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 250)));
          await t.pump(const Duration(milliseconds: 100));
        }
        final ShellController shell = (t.state(find.byType(MaterialShell)) as dynamic).shell;
        switch (page) {
          case 'inbox':
            shell.go(1);
          case 'session':
            shell
              ..select('${MockWorld.macbook}/0d7c3b55')
              ..go(2);
          default:
            shell.go(0);
        }
        for (var i = 0; i < 10; i++) {
          await t.pump(const Duration(milliseconds: 100));
        }
        // let the selected session subscribe and receive its conversation from the mock host
        for (var i = 0; i < 8; i++) {
          await t.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 250)));
          await t.pump(const Duration(milliseconds: 100));
        }
        await t.runAsync(() async {
          final boundary = key.currentContext!.findRenderObject()! as RenderRepaintBoundary;
          final image = await boundary.toImage(pixelRatio: 2);
          final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
          File('${Platform.environment['OUT']}/android-tablet-$page-${dark ? 'dark' : 'light'}.png').writeAsBytesSync(bytes!.buffer.asUint8List());
        });
        await t.pumpWidget(const SizedBox());
        app.dispose();
      }
    }
  });
}
