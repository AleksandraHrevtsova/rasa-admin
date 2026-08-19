## GET /counterparties

Возвращает список контрагентов.

## GET /counterparties/:id

Возвращает карточку контрагента.

## POST /counterparties

Пример запроса:
```
{
  "name": "Тарас",
  "namePublic": "Тарас Львов",
  "requisiteMode": "BOTH",
  "weeklyLimit": 100000,
  "paymentTypes": [],
  "products": []
}
```

## PUT /counterparties/:id

