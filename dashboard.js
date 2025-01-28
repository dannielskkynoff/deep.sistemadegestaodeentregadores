// Função para criar um pedido
document.getElementById("callDelivery").addEventListener("click", () => {
  const clientAddress = prompt("Digite o endereço do cliente:");
  if (clientAddress) {
    db.collection("orders").add({
      status: "pending",
      clientAddress,
      createdAt: new Date(),
    });
  }
});

// Função para atualizar a lista de pedidos
const updateOrders = (status, elementId) => {
  db.collection("orders")
    .where("status", "==", status)
    .onSnapshot((snapshot) => {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push(`<li>${doc.data().clientAddress}</li>`);
      });
      document.getElementById(elementId).innerHTML = orders.join("");
    });
};

// Atualiza as seções
updateOrders("pending", "pendingOrders");
updateOrders("accepted", "acceptedOrders");
updateOrders("delivered", "deliveredOrders");
