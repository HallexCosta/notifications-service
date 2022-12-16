Acesse [aqui](../README.md) para voltar para README da aplicação.

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

