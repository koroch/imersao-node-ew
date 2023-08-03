const ContextStrategy = require("./database/strategies/base/contextStrategy");
const MongoDB = require("./database/strategies/mongodb");
const Postgres = require("./database/strategies/postgres");

const ContextMongo = new ContextStrategy(new MongoDB());
ContextMongo.create();

const ContextPostgres = new ContextStrategy(new Postgres());
ContextPostgres.create();