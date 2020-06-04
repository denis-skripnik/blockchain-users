# Сервис топа пользователей блокчейнов Viz и Golos
Показывает топ 100 пользователей в формате JSON.
## Требования
1. node.js и npm;
2. pm2
npm install pm2 -g

## Установка
В папке проекта выполнить команду:
npm install
## Запуск
node run_top.js или pm2 start run_top.js
## Пример запроса:
ip:3100/golos-top/?type=... или ip:3100/viz-top/?type=...

## Значения type:
### для golos
- gp - по СГ
- delegated_gp - по делегированной другим СГ;
- received_gp - по полученной СГ;
- effective_gp - по эффективной СГ (своя - делегированная другим + полученная делегированием);
- golos - по токену golos;
- gbg - по токену gbg.

### Viz
- shares - по соц. капиталу;
- delegated_shares - делегированный другим соц. капитал;
- received_shares - полученное делегирование соц. капитала;
- effective_shares - эффективный соц. капитал;
- viz - топ по токену VIZ.

## Пример:
ip:3100/viz-top/?type=effective_shares