module.exports = {
  root: true,

  levels: [
    { path: 'blocks' },
  ],

  modules: {
    'bem-tools': {
      plugins: {
        create: {
          // Настройки уровней, которые используются только
          // в `bem-tools-create`
          levels: {
            'src/blocks': {
              // Уровень по умолчанию, создаём сущности тут,
              // если уровень не задан
              default: true,

              // Технологии по умолчанию для создания блоков на уровне
              techs: ['css'],
            }
          }
        }
      }
    }
  }
}