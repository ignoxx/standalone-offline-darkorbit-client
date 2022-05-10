/**
 * All accepted packets you can send to the client
 */

const finalizePacket = (packet) => packet + '\0'

module.exports.finalizePacket

module.exports.sendMessage = (message) => {
    // 0|A|STD|String
    return finalizePacket(`0|A|STD|${message}`)
}


module.exports.changeMap = (id) => {
    // 0|i|MapID
    return finalizePacket(`0|i|${id}`)
}

module.exports.changeMap2 = (id) => {
    // 0|m|MapID
    return finalizePacket(`0|m|${id}`)
}

module.exports.levelUp = (newLevel, expToNextLevel) => {
    return finalizePacket(`0|A|LUP|${newLevel}|${expToNextLevel}`)
}


module.exports.spawnOre = (id, type, x, y, isBomb = 0) => {
    /**
     * 0|r|id|oretype|x|y|isBomb("mine detonates in 5 seconds" afaik)			
        1 prometium
        2 endurium
        3 terbium
        10 mine
        20 detonating smartbomb
        1xy-200 small firework with company colors x and then y
        2xy-300 medium firework with company colors x and then y
        3xy-zxy big firework with company colors z - 2, x and then y
        (How exactly the colors are calculated is not of importance. random from 0-99 + size*100 should be enough to make colorful random fireworks)
     */

    return finalizePacket(`0|r|${id}|${type}|${x}|${y}|${isBomb}`)
}

module.exports.collectOre = (id) => {
    // 0|e|id
    // 0|e|1 (Collected prometium)
    return finalizePacket(`0|e|${id}`)
}

module.exports.removeOre = (id) => {
    // 0|q|int/string
    return finalizePacket(`0|q|${id}`)
}

module.exports.spawnBonusBox = (bonusBoxId, type, x, y) => {
    // 0|c|bonusboxID | boxType | posX | posY
    return finalizePacket(`0|c|${bonusBoxId}|${type}|${x}|${y}`)
}

module.exports.deSpawnBonusBox = (bonusBoxId) => {
    // 0|2|int
    return finalizePacket(`0|2|${bonusBoxId}`)
}

module.exports.initQuest = (questId, questName) => {
    // 0|9|ini|QuestID|QuestName (QuestName might be wrong)
    return finalizePacket(`0|9|ini|${questId}|${questName}`)
}

module.exports.cancelQuest = (questId) => {
    // 0|9|c|QuestID (QUESTID IS MAYBE THE QUEST TITLE FE: 687 = q_200_mmo)
    return finalizePacket(`0|9|c|${questId}|${questName}`)
}

module.exports.failedQuest = (questId) => {
    //0|9|f|QuestID
    return finalizePacket(`0|9|f|${questId}`)
}

module.exports.privilegQuest = (questId) => {
    //0|9|p|QuestID
    return finalizePacket(`0|9|p|${questId}`)
}

module.exports.questSuccess = (questId, questNameId) => {
    // 0|9|a|QuestID|QuestNameId
    return finalizePacket(`0|9|a|${questId}|${questNameId}`)
}

module.exports.questSpecialSuccess = (questId, ratingPoints, number1, number2) => {
    // 0|9|as|QuestID|ratingPoints|int|int
    return finalizePacket(`0|9|as|${questId}|${ratingPoints}|${number1}|${number2}`)
}

module.exports.questUpdate = (questId, number1, number2, number3, bool) => {
    // 0|9|upd|QuestID|i|int|int|int|bool
    return finalizePacket(`0|9|upd|${questId}|i|${number1}|${number2}|${number3}|${bool}`)
}

module.exports.guestPleaseRegister = (message) => {
    // 0|GUEST_PLEASE_REGISTER|string
    return finalizePacket(`0|GUEST_PLEASE_REGISTER|${message}`)
}

module.exports.placeBigRedCrosshair = (x, y) => {
    // 0|6|x|y
    return finalizePacket(`0|6|${x}|${y}`)
}