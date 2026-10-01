# Changelog

## [0.2.0](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.1.0...agentic-design-system-v0.2.0) (2026-10-01)


### ⚠ BREAKING CHANGES

* **Input:** `className` pasa de aplicarse a un <label> raíz a un <div> raíz. Quien dependiera de que la raíz fuera un <label> (p. ej. selectores CSS `label.mi-clase`) debe ajustarlo. Hacer clic en el texto de ayuda ya no enfoca el campo (antes, al estar dentro del label, sí).

### Funcionalidades

* **tokens:** añadir spacing y fontWeight sincronizados con Figma ([2185051](https://github.com/holalfonso-ship-it/agentic-design-system/commit/21850510994cffde34e7d1d4eb490219dd7f5888))


### Correcciones

* **Input:** sacar helper/error del &lt;label&gt; y enlazarlos con aria-describedby ([807f6f4](https://github.com/holalfonso-ship-it/agentic-design-system/commit/807f6f4f177432ed096a73891cb490992be9e461))
* **Modal:** glifo del botón cerrar a la escala tipográfica (18 → 20) ([0c233b7](https://github.com/holalfonso-ship-it/agentic-design-system/commit/0c233b70e58f3dc36a2b78e3d15a44c5b5adb8b7))


### Refactorización

* tokenizar sizeToFontSize de Avatar y borderRadius de TabBar ([6757aed](https://github.com/holalfonso-ship-it/agentic-design-system/commit/6757aed93ffcbeb65a253d2a8df23801118120e4))
* tokenizar spacing y fontWeight en los 11 componentes ([cf8cffe](https://github.com/holalfonso-ship-it/agentic-design-system/commit/cf8cffea26282b975f14601ef86c1926541ad72f))


### Documentación

* alinear la metadata con el código y documentar decisiones del Ciclo 2 ([ac8002d](https://github.com/holalfonso-ship-it/agentic-design-system/commit/ac8002d3386f5476d99af6e21bf616122516b0b4))
* declarar space y fontWeight en la metadata y documentar la regla ([9dfa725](https://github.com/holalfonso-ship-it/agentic-design-system/commit/9dfa7253f0a7b5e20aa87397f396fb45eca91672))
