# [Проектная работа №11](http://yagushevskij.github.io/sprint-11/) яндекс практикум v1.0

## Описание проекта
В данной работе продемонстрированы навыки работы со сборщиком webpack: настройка сборки и демонстрация результата его работы.
Особенности проекта:
- сборка произведена с использованием JS модулей;
- для обеспечения кроссбраузерности проставлены вендорные преффиксы в CSS ([autoprefixer](https://www.npmjs.com/package/autoprefixer)) и выполнена транспиляция JS кода в ES5 ([babel-loader](https://www.npmjs.com/package/babel-loader));
- настроено хеширование css и js файлов для отслеживания в них изменений ([webpack-md5-hash](https://www.npmjs.com/package/webpack-md5-hash));
- настрена обработка графических файлов: компрессия png, gif, jpeg и webp форматов для уменьшения размеров картинок без визуальной потери качества ([image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)).
Файлы с css, js и html кодом минифицированы для более быстрой загрузки страницы.

## Используемые технологии
Git, Webpack, JavaScript.