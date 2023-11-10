const {api} = require('./api')


const returnedData = 'item, name, scpoints,image,claims, objectClass'

const SCP =  {
  allscp: async (fetchData = returnedData) => {  //return all scp
    try {
      const response = await api.get(`/scp/all?data=${fetchData}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro na chamada API:", error);
      console.log("Detalhes do erro:", error.response);
      throw error; // Rejeita a promessa com o erro
    }
  },
  scpbyid: async (item, fetchData = returnedData) => { //return a scp by item ex: SCP-001
    try {
      const response = await api.get(`/scp/${item}?data=${fetchData}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro na chamada API:", error);
      console.log("Detalhes do erro:", error.response);
      throw error; // Rejeita a promessa com o erro
    }
  },
  scprank: async (qtd, fetchData = returnedData) => { //return scp ranking based in scpoints 
    try {
      const response = await api.get(`/scp/rank/${qtd}?data=${fetchData}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro na chamada API:", error);
      console.log("Detalhes do erro:", error.response);
      throw error; // Rejeita a promessa com o erro
    }
  },
  updateclaim: async (scpItem, fetchData = returnedData) => { //update field claims in scp 
    try {
      const response = await api.put(`/scp/${scpItem}/claim?data=${fetchData}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro na chamada API:", error);
      console.log("Detalhes do erro:", error.response);
      throw error; // Rejeita a promessa com o erro
    }
  },
  random: async () => {
    try {
      const response = await api.get(`/scp/random`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro na chamada API:", error);
      console.log("Detalhes do erro:", error.response);
      throw error; // Rejeita a promessa com o erro
    }
  }
}

let teste = SCP.random()
console.log(teste)

module.exports = {SCP}
