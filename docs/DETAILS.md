<a href="../README.md" style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 20px;">
    <img src="./assets/images/arrow-left-solid.svg" width="24" height="24" />
    Voltar
</a>

Deis decorators fornecidos pelo framework Nest.js como `@Get, @Post, @Patch, @Module, @Controller, @Injectable` a patterns utilizados como `Mapper, Factory e InMemoryRepository`.

### Aula 01
Criamos um projeto em **Nest.js**, integramos com prisma, criamos a migration para criar uma tabela no banco de dados, configuramos o prisma para funcionar com **SQLite**.  
Entendemos como o Nest.js aplica o conceito de injeção e inversão de dependência, entendemos o uso dos decorators em controllers e em services.

**Decorators**: São funções "magícas", que tem como objetivo decorar o nosso objeto (no sentido de infeitar, e não de memorizar).
Explicando alguns decorators do Nest.js:  
**@Injectable()** -> Informa para o Nest que aquela classe é uma classe que pode ser injetada como uma dependência de outra classe.  
**@Controller(group: string)** -> Informa para o Nest que aquela calsse é uma controladora, em Rest, isso segnifica que ela é a responsavel em receber as requisições do usuário.  
Os decorator controller, permite passar 1 parâmetro que é um prefix para rota (conhecido como agrupamento de rotas)  
**@Get(endpoint: string)** -> Permite você definir o tipo de método da requisição HTTP, que o método da sua classe deve atender. Também recebem 1 parâmetro que é o endpoint que ele deve atender.   
Este decorator possui algumas variantes como `POST, PUT, PATCH, DELETE e OPTIONS` que recebe os mesmo paramêtro que o `@GET`.  
**@Module({ imports: [], controllers: [], providers: []})** -> Informa a Nest que a classe em questão é do tipo Module, que pode receber importações de outros modulos, como também controllers, e providers.  
**@Body()** -> Informa ao método da classe que quero que injete o corpo recebido da requisição dentro de uma varíavel  

### Aula 02
Organizamos nossas camadas de infra e application, criamos e aplicamos testes em nosso caso de uso send-notification, utilizamos o pattern InMemoryRepository.

**InMemoryRepositoryPattern** é usado quando você quer testar sua aplicação sem ter que subir um banco PostgreSQL, MySQL, MongoDB, entre outros diversos tipos de SGBD, com ele você cria uma especie de banco em memoria e "guarda" seus dados durante a execução dos testes, já que os testes unitários devem ser independente de conexão com a internet.

Dividimos a nossa aplicação duas vertentes "infra" e"application":  
**infra** é a camada onde está tudo que está relacionado com serviços externos, ou dependências da nossa aplicação.  
**application** é a camada responsável por lidar com regras de negócio da aplicação.

### Aula 03
Vimos o conceito de `Mapper` e `ViewModels` e como podemos formatar a nossa entitidade da aplicaçao, independente de `ORM` como `Prisma` e retornar somentes as propriedades desejas para resposta `HTTP`, vimos sobre o `Factory` Pattern que pode ser usado para facilitar a criação dos objetos como objeto Notification da aplicação.

**Mappers:** Os mappers tem como propósito de converter os dados, para um formato que a camada responsável entenda.
Por exemplo, quando eu possuo e trato os dados do envio da minha notificação dentro da camada minha camada de caso de uso, o proximo passo seria persistir este dado no banco, para isso, é necessário que a notificação seja passada para dentro da camada de repositório da minha aplicação e está camada se tornará responsável de chamar os serviços de persistência do `Prisma`, e usar um `Mapper` para converter o formato da notificação da minha camada de aplicação para um formato que o modelo do `Prisma` entenda.

**Qual a diferença entre entidades da aplicação e modelos prisma?**  
Entidades da aplicação podem conter validações e um formato asimilir de APIs, já o prisma models possui o formato mais puro possível para aquela objeto.  
Um exemplo disso é a entidade `notification` da nossa aplicação, a notificação na camada de persistência de dados, não é a mesma coisa da notificação da camada da aplicação, ou seja, entities e `PrismaModels` podem parecer e ter atributos semelhantes, mais não são a mesma coisa.

### Aula 04

Sem sombra de dúvidas irei definir o video de finalização do evento como aula 04 :eye:, e digo mais, essa foi a aula que mais me chamou a atenção, nunca tinha testado o Kafka mais sempre tive muita curiosidade em entender como funciona o fluxo de mensageria assíncrona. Bom sem mais prolongamentos vamos falar do que se trata o Kafka.

**Kafka** é um serviço de mensageria assíncrona que é utilizado comunicação entre aplicações, para que isso funcione ele é divido em 3 subvertentes. **Topics**, **Consumers** e **Producers**

**Topics:** Em Apache Kafka, um tópico é uma categoria ou fonte para a qual são publicadas mensagens. Produtores escrevem dados para tópicos e consumidores leem de tópicos.

No Kafka, o conceito central é um tópico. Produtores escrevem dados para tópicos e consumidores leem de tópicos.

Um tópico é identificado por seu nome. As mensagens são matrizes de bytes que podem armazenar qualquer tipo de dados, então um tópico pode ser usado para alimentar qualquer tipo de dados ao Kafka.

Por exemplo, um tópico pode ser usado para armazenar dados de log, como um barramento de mensagens para conectar microsserviços ou para armazenar eventos para event sourcing.

Cada tópico é dividido em várias partições, o que permite o processamento paralelo dos dados pelos consumidores. Quando um produtor publica uma mensagem em um tópico, ela é anexada ao final da partição.

Os consumidores podem ler de uma partição específica ou de todas as partições do tópico.

Em resumo, os tópicos são o componente central do Kafka e são usados para armazenar e distribuir dados dentro de um cluster Kafka.

**Consumers**:
Em Apache Kafka, um consumidor é uma aplicação cliente que lê dados de tópicos Kafka. Os consumidores se inscrevem em um ou mais tópicos e consomem as mensagens publicadas nesses tópicos.

Os consumidores leem os dados na ordem em que foram publicados no tópico, começando do início ou de um deslocamento específico. Eles também podem ler dados em tempo real à medida que são produzidos.

Um consumidor pode pertencer a um grupo de consumidores, que é um grupo de consumidores que trabalham juntos para consumir os dados em um tópico. Cada consumidor em um grupo lê de uma partição diferente no tópico, permitindo o processamento paralelo dos dados.

O uso de grupos de consumidores permite escalabilidade e tolerância a falhas no Kafka. Se um consumidor falhar, os dados que ele estava consumindo podem ser reequilibrados entre os consumidores restantes no grupo.

Em resumo, os consumidores são aplicações cliente que leem dados de tópicos Kafka e podem pertencer a grupos de consumidores para escalabilidade e tolerância a falhas.

**Producers**:
Em Apache Kafka, um produtor é uma aplicação cliente que escreve dados em tópicos Kafka. Os produtores publicam dados em um ou mais tópicos e os dados são armazenados no tópico até serem consumidos pelos consumidores.

Os produtores enviam mensagens para os brokers Kafka, que são os servidores em um cluster Kafka responsáveis por armazenar os dados e fornecê-los aos consumidores. Os produtores podem escolher em qual partição escrever dentro de um tópico ou permitir que o broker Kafka atribua a partição com base em uma estratégia de particionamento.

Os produtores também podem especificar a chave para cada mensagem, que determina em qual partição a mensagem será escrita. Por exemplo, um produtor pode querer que todas as mensagens com a mesma chave sejam escritas na mesma partição.

Em resumo, os produtores são aplicações cliente que escrevem dados em tópicos Kafka e enviam os dados para brokers Kafka para armazenamento e fornecimento aos consumidores.