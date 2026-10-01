import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:noor_e_ilahi/main.dart';

void main() {
  testWidgets('Noor app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const ProviderScope(child: NoorApp()));
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
