module.exports = function(playerAction){
    const actions = ['rock', 'paper', 'scissors'];
    const computerAction = actions[Math.floor(Math.random() * 3)];

    if(playerAction === computerAction){
        return 0; // 平局
    }

    if(
        (playerAction === 'rock' && computerAction === 'scissors') ||
        (playerAction === 'paper' && computerAction === 'rock') ||
        (playerAction === 'scissors' && computerAction === 'paper')
    ){
        return 1; // 玩家赢
    }

    return -1; // 玩家输
}