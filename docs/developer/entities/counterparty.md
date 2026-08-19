## Model: counterparty
### Main filds: 
* id
* name
* namePublic
* isActive

## Relations
### Hub
* Counterparty 1:N Hub
### User 
* Counterparty 1:N User
### Product
* Counterparty M:N Product

through table: counterparty_products

### PaymentType
* Counterparty M:N PaymentType

through table: counterparty_payment_types

### Requisite Settings
* Counterparty 1:N CounterpartyRequisiteSetting

history via ```validFrom``` and ```validTo``` fields

### Requisites
* Counterparty 1:N Requisite