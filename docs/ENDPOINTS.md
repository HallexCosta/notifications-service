Acesse [aqui](../README.md) para voltar para README da aplicação.

- [Send Notification](#send-notification-for-an-recipient)
- [Get Recipient Notifications](#get-recipient-notifications)
- [Count Recipient Notifications](#count-recipient-notifications)
- [Cancel Notification](#cancel-notification)
- [Read Notification](#read-notification)
- [Unread Notification](#unread-notification)

#### Send Notification for an Recipient
**Endpoint**: POST /notifications  
**Descrição**: Este endpoint envia uma notificação para um recebedor.  
**Parâmetros**:  
Body:
```json
{
  "recipientId": "recipient-1"
  "content": "Mais alguém leu está documentção!",
  "category": "social",
}
```
**Resposta**:  
Status: 201 Created  
Body: 
```json
{
  "notification": {
    "recipientId": "recipient-1"
    "content": "Mais alguém leu está documentção!",
    "category": "social",
  }
}
```

#### Get Recipient Notifications

**Endpoint**: GET /notifications/from/:recipientId  
**Descrição**: Este endpoint fornece uma lista com todas as notificações de um recebedor.  
**Parâmetros**: 

|Nome| Descrição |
|--- | --------- |
|:recipientId | Id do recebedor  |

**Resposta**:  
Status: 200 OK  
Body: 
```json
{
  "notifications": [
    {
      "id": "notification-1",
      "content": "Você tem uma nova solicitção de amizade!",
      "category": "social",
      "recipientId": "recipient-1",
    },
    {
      "id": "notification-2",
      "content": "Você tem uma nova solicitção de amizade!",
      "category": "social",
      "recipientId": "recipient-1",
    },
    {
      "id": "notification-3",
      "content": "Você tem uma nova solicitção de amizade!",
      "category": "social",
      "recipientId": "recipient-1",
    },
    ...
  ]
}
```

#### Count Recipient Notifications
**Endpoint**: GET /notifications/count/from/:recipientId  
**Descrição**: Este endpoint conta a quantidade de notificações de um recebedor.  
**Parâmetros**:

|Nome| Descrição |
|--- | --------- |
|:recipientId | Id do recebedor  |
**Resposta**:  
Status: 200 OK  
Body: 
```json
{
  "count": 3
}
```

#### Cancel Notification
**Endpoint**: PATCH /notifications/:recipientId/cancel  
**Descrição**: Este endpoint cancela uma notificação de um recebedor.  
**Parâmetros**:

|Nome| Descrição |
|--- | --------- |
|:recipientId | Id do recebedor  |
**Resposta**:  
Status: 200 OK  
Body: No body

#### Read Notification
**Endpoint**: PATCH /notifications/:recipientId/read  
**Descrição**: Este endpoint lê uma notificação de um recebedor.  
**Parâmetros**:

|Nome| Descrição |
|--- | --------- |
|:recipientId | Id do recebedor  |
**Resposta**:  
Status: 200 OK  
Body: No body

#### Unread Notification
**Endpoint**: PATCH /notifications/:recipientId/unread  
**Descrição**: Este endpoint "des-lê" uma notificação de um recebedor.  
**Parâmetros**:

|Nome| Descrição |
|--- | --------- |
|:recipientId | Id do recebedor  |
**Resposta**:  
Status: 200 OK  
Body: No body
