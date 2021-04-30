# Architecture

**!! PLEASE CHANGE/REMOVE THIS FILE AS YOU WANT !!**

This web application server project is based on layered architecutre. These are the layers contained in this project(*a low number means higher layer*):

1. **Presentation Layer(Controllers)**: A layer where API requests are being handled at the front. Controllers of express.js stays in this layer.
2. **Business Layer(Services)**: A layer where literal business logic resides. Recommended to be declarative rather than imperative, since real implementations are done in the implment layer and this layer uses those implemenations to run the logic.
3. **Implement Layer(Modules)**: A layer where implementations of business logic stays. The logic can be broken down into several implementations(in other words, modules), so the component of service layer can use multiple modules of this layer to achieve its given business logic.
4. **Data Access Layer(Models)**: A layer where access to the various kinds of resources happens. Components of the implement layer easily get data they need using interfaces provided by this layer.

The caveat is that one layer can access the layer right below and components of each layer cannot reference each other excluding components in the implement layer.

Recommend to follow the layered architecture explained above to implement a stable and maintainable web application.
