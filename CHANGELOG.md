# Changelog

## [0.4.3](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.4.2...agentic-design-system-v0.4.3) (2026-10-02)


### Correcciones

* **ProductCard:** la pista de crédito usa su propio token card.credit.progressTrack ([cb64fae](https://github.com/holalfonso-ship-it/agentic-design-system/commit/cb64fae1482bb7431bf4667acae7fc9acd0f6f95))

## [0.4.2](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.4.1...agentic-design-system-v0.4.2) (2026-10-02)


### Correcciones

* **ProductCard:** la pista BNPL usa su propio token card.bnpl.progressTrack ([d6beec9](https://github.com/holalfonso-ship-it/agentic-design-system/commit/d6beec9b4028c29f3ecdba8e85acc06293530d11))

## [0.4.1](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.4.0...agentic-design-system-v0.4.1) (2026-10-02)


### Correcciones

* **scripts:** generate-index funciona con espacios en la ruta ([8f61e7e](https://github.com/holalfonso-ship-it/agentic-design-system/commit/8f61e7ed601f9b8835404ff3b95d1657ef4e5222))

## [0.4.0](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.3.0...agentic-design-system-v0.4.0) (2026-10-02)


### Funcionalidades

* añade entrada de librería y build para npm ([00e6309](https://github.com/holalfonso-ship-it/agentic-design-system/commit/00e6309c1f8bf49fa5afeba0fc6c6f6925e7daf9))
* prepara el paquete para publicarlo en npm ([0c086bb](https://github.com/holalfonso-ship-it/agentic-design-system/commit/0c086bbf235ac4d9037628b01841ebf3a26df329))

## [0.3.0](https://github.com/holalfonso-ship-it/agentic-design-system/compare/agentic-design-system-v0.2.0...agentic-design-system-v0.3.0) (2026-10-02)


### ⚠ BREAKING CHANGES

* **ProductCard:** ProductCard ya no acepta title, subtitle ni amount; ahora usa side, cardNumber, holderName, logo, statusIcon, balance, balanceCaption, progress, primaryAction y secondaryAction.

### Funcionalidades

* **Icon:** componente Icon con glifos de Lucide mapeados a los SF Symbols de Figma ([d84d50e](https://github.com/holalfonso-ship-it/agentic-design-system/commit/d84d50e667be909ee137fedb731d7187727d2c45))
* **ProductCard:** reconstruir según el component set de Figma (12 variantes) ([1f7aa59](https://github.com/holalfonso-ship-it/agentic-design-system/commit/1f7aa593687905563649e3a82af8dd653ecaee7c))
* **ProductCard:** usa Icon lock como icono de estado por defecto ([6082f85](https://github.com/holalfonso-ship-it/agentic-design-system/commit/6082f85e46da0252a32b0f6e67eaf6bb7957d19e))


### Correcciones

* alinear con Figma pesos y paddings, y ajustar spacing fuera de escala ([d1e8789](https://github.com/holalfonso-ship-it/agentic-design-system/commit/d1e87893fcd6b3bbab9cbaaefd33e2f75b0623be))
* **Button,TransactionListItem,Input:** altura del Button, tamaños de TransactionListItem y peso de la etiqueta de Input según Figma ([c8d841f](https://github.com/holalfonso-ship-it/agentic-design-system/commit/c8d841f3392a2f00938b06f48ae73ae513d7d1c4))


### Documentación

* **CLAUDE.md:** el Audit revisa las SOPs sin verificar ([e276de1](https://github.com/holalfonso-ship-it/agentic-design-system/commit/e276de1419a1614630e9e1ace29837c87908d8ee))
* **ProductCard:** las stories bloqueadas muestran el icono por defecto ([66b7f35](https://github.com/holalfonso-ship-it/agentic-design-system/commit/66b7f35ea9be9b0c4030f77b8082c40849cea565))

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
