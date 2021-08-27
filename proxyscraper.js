const axios = require('axios');
var path = require("path");
fs = require('fs');
const http_web_list = [
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all",
    "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
    "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
    "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt"
]
const sock4_web_list = [
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt"
]
const sock5_web_list = [
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt",
]
var list = [];
(async()=>{
    if (process.argv.length != 3) {
        console.log(`\nUsage: node ${path.basename(process.argv[1])} [http,sock4,sock5]`)
        process.exit()
    }else{
        var modes = process.argv[2];
        switch (modes.toUpperCase()) {
            case "HTTP":
                array = http_web_list
                break;
            case "SOCK4":
                array = sock4_web_list
                break;
            case "SOCK5":
                array = sock5_web_list    
                break;           
            default:
                console.log("Modes Not Found")
                process.exit()
        }
        var i = 0
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            i++
            try {
                var res = await axios.get(element)
                var proxies = res.data.replace(/\r/g, '').split('\n');
                list = list.concat(proxies);
                console.log(`Download ${i}/${array.length} ${list.length}`)
            } catch (err) {
                console.log(`Error ${i}/${array.length} ${list.length}`)
            }
        }
        var remove_duplicate = new Set(list);
        proxy = [...remove_duplicate]
        var writeStream = fs.createWriteStream(modes+'.txt');
        proxy.forEach(value => writeStream.write(`${value}\n`));
        writeStream.end();
        console.log("Success: Save",proxy.length,modes.toUpperCase(),"proxy")
    }
})();