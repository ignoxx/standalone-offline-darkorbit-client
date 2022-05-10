const { createServer } = require('net');
const { changeMap, changeMap2, collectOre, finalizePacket, removeOre, sendMessage, spawnBonusBox, spawnOre } = require('./packets/client.js');

const gameServer = createServer((socket) => {
    socket.setEncoding('utf8');

    function onData(data) {
        console.log("gameServer on data: " + data)

        const dataArray = data.split("|")

        switch (dataArray[0]) {
            case 'LOGIN':
                // LOGIN|USERID|SSID?
                // 0|I|UserId|Name|ShipType|Speed|SHD|MSHD|HP|MHP|FreeCargo|MaxCargo|X + 00|Y + 00|MapId|FractionId|ClanId|MaxAmmo|MaxRockets|oState|isPremium|Experience|Honor|Level|Credits|Uridium|Jackpot|Userrank|ClanTag|gatesArchieved|UseSysFont
                // 0|I|UserId|Name|ShipType|Speed|SHD|MSHD|HP|MHP|FreeCargo|MaxCargo|X + 00|Y + 00|MapId|FractionId|ClanId|MaxAmmo|MaxRockets|UserId|isPremium|Experience|Honor|Level|Credits|Uridium|Jackpot|Userrank|ClanTag(can be GUEST TOO)|gatesArchieved|UseSysFont
                setTimeout(() => {
                    socket.write("0|I|1|Moonsteroid|53|540|120000|120000|256000|256000|3|10|1000|10000|3|3|3|20000|400|3|1|1246000|15620|10|1205010|1205|0|20|SA|3|0|0|50|25\0")
                }, 1000)
                socket.write("0|A|SET|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|0\0")
                socket.write("0|A|ADM|CLI|1\0")
                // socket.write("0|I|1|Moonsteroid|53|540|120000|120000|256000|256000|3|10|1000|10000|3|3|3|20000|400|3|1|1246000|15620|10|1205010|1205|0|20|SA|3|0|0|50|25\0")
                // socket.write("RDY|I|1|Moonsteroid|53|540|120000|120000|256000|256000|3|10|1000|10000|3|3|3|20000|400|3|1|1246000|15620|10|1205010|1205|0|20|SA|3|0|0|50|25\0")

                // socket.write("0|A|BS|10|10|10|10\0") // boosters

                // socket.write("0|n|e|1|3/3-10,0-11;0-12,0/4-10,0-25,0-25,0-11,0/3-25,1-24,2-23,0\0")
                // socket.write(changeMap(16))
                // socket.write(spawnOre(17, 1, 1000, 1000))
                // socket.write(spawnOre(4, 10, 1020, 1000, 1))
                // socket.write(spawnOre(5, 20, 1030, 1000, 1))
                // socket.write(spawnBonusBox(10, 2, 1100, 1100))
                // socket.write(spawnBonusBox(20, 0, 1250, 1100))
                socket.write(sendMessage("MOONSTEROID needs cigars"))
                break

            case '1': // move
                // 1|2319|1156|2452|1220
                // 1|TO-X|TO-Y|FROM-X|FROM-Y
                break;

            case 'j': // jump
                socket.write(changeMap(dataArray[1]))
                break;

            case 'S': // switch config
                // S|CFG|2
                break;

            case 'A':
                // All settings checked: A|SET|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1
                // All disabled:         A|SET|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0
                //                       A|SET|1|1|1|1|1|1|0|1|1|1|1|1|1|0|0|0|1|1|1|1|1|0|1|1|1
                //                       A|SET|CPU|DMGBAR|LASERS|EXPLOSIONS|PLAYERNAMES|COMPANYICON|TRANSPARENTBG|RES|BB|NPCS|PORTALS|HITCOUNT|MSGSTATUS|CHAT|MUSIC|SOUND|HPNUMS|DRONES|OTHERCARGO|AUTOAMMOSWITCH|BUYNOWMENU
                socket.write("0|" + data.toString() + "\0")
                break;

            case 'PNG': // ping
                socket.write('PNG\0')
                break;

            case 'l': // initiate logout
                break;

            case 'o': // cancel logout
                break;

            case '9': // open help menu
                // 9|i|0|1
                break;

            case 'u': // select laser
                // u|1 - LCB-10
                // u|2 - MCB-25
                // u|3 - MCB-50
                // u|4 - UCB-50
                // u|5 - SAB
                break;

            case 'd': // select rocket
                // d|1 - R-310
                // d|2 - PLT-2026
                // d|3 - PLT-2021
                break;

            case 'S': // specials
                // S|MIN - ACM-1
                // S|SMB - SMB01
                // S|ISH - ISH
                // S|ROB - ROB (repair bot)

                // S|EXTRA|ACTIVATED?
                // S|AIM|1 - AIM01
                // S|ARL|1 - AROL-X
                // S|CLK - CLO4K
                // S|J|0 - JPO2 (jump to base cpu?)
                break;

            case 'b': // open ressource window (HM7)
                break;

            case 'T': // sell ressource
                // T|TYPE|AMOUNT
                // T|1|0 - PROMETIUM
                // T|2|0 - ENDURIUM
                // T|3|0 - TERBIUM
                // T|11|0 - PROMETID
                // T|12|0 - DURANIUM
                // T|13|0 - PROMERIUM
                break;

            case 'w': // collect ressource
                // w|id
                let id = dataArray[1]
                console.log("collect ore id: " + id)
                socket.write(collectOre(id))
                socket.write(removeOre(id))
                socket.write(sendMessage("MOONSTEROID wants more cigars"))
                break;

            case 'x': // collect cargo/bb
                // x|id
                break;

            default:
                console.log("default: " + socket.write(data))

        }
    }

    socket.on('data', onData)

    socket.on('error', function (err) {
        if (socket && socket.end) {
            socket.end();
            socket.destroy();
        }
    });

    socket.on('connect', function () {
        console.log("connect emu!")
    });

    socket.on('end', function () {
        socket.end();
    });
})


module.exports = gameServer;