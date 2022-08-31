import app from "./app";
class Server {
  private PORT = 8080;
  public startServer() {
    app.getApplication().listen(this.PORT, () => {
      console.log(`rodando na porta ${this.PORT}`);
    });
  }
}

new Server().startServer();
