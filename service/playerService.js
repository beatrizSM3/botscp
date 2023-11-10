const {api} = require('./api')

const returnedData = 'playerDiscordId, level, name, scpoints , currentXp, title, className'
const returnedScpData = "item, name, scpoints, image, claims, objectClass"

const Player = {
    playerbyid: async (playerDiscordId, playerGuildId, fetchData = returnedData) => { //return a player by discord id
        try {
            const response = await api.get(`/player/${playerDiscordId}/${playerGuildId}?data=${fetchData}`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }
    },
    playerRank: async (qtd, fetchData= returnedData) => { //return player rank 
        try {
            const response = await api.get(`/player/rank/${qtd}?data=${fetchData}`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }
    },
    playerScps: async (playerDiscordId, playerGuildId, fetchData = returnedScpData) => { //return the scps of player
        try {
            const response = await api.get(`/player/${playerDiscordId}/${playerGuildId}/scps?data=${fetchData}`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }
    },
    add: async (playerDiscordId, playerGuildId, name) => { //add new player
        try {
            const response = await api.post(`/player/${playerDiscordId}/${playerGuildId}/add?name=${name}`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }

    },
    addScp: async (playerDiscordId, playerGuildId, scpItem) => { //add new scp at player list
        try {
            const response = await api.put(`/player/${playerDiscordId}/${playerGuildId}/add/scp/?scp_item=${scpItem}`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }

    },
    updateXp: async (playerDiscordId, playerGuildId) => { //update xp player in 10
        try {
            const response = await api.put(`/player/${playerDiscordId}/${playerGuildId}/xp`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }

    },
    updateScpoints: async (playerDiscordId, playerGuildId, scpItem) => {
        try {
            const response = await api.put(`/player/${playerDiscordId}/${playerGuildId}/${scpItem}/scpoints`);
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error("Erro na chamada API:", error);
            console.log("Detalhes do erro:", error.response);
            return response.data
            throw error; // Rejeita a promessa com o erro
        }
    }
}



module.exports = { Player}