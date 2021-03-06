//포팅 완료된 자료형으로 이루어진 데이터를 시그니쳐로 만들 수 있습니다.
//마지막줄은 프라이빗키입니다.
//지원하는 자료형은 function toHexBuf 에서 확인할 수 있습니다.
//var data=[ 
//    ["EOS8NvFPyMHopRbX241k2bH3roNCDxAL9t1mhQrj9kwh6WucaqEHd","key"],
//    ["1.051 EOS","asset"],
//    ["I love you","string"],
//    ["5JfakvEgxNmZGFrAFQ8ubTzKA6HMN4bP6aEBCo6NqYtfCPF88Ud"]
//];
function gen_sig(data) {
    var buf = [];
    var wif = data[data.length - 1][0];
    for (var i = 0; i < data.length - 1; i++) {
        var tmp = data[i];
        buf = buf.concat(toHexBuf(tmp[0], tmp[1]));
    }
    var hash = eosjs_ecc.sha256(buf);
    console.log(buf);
    console.log("\n")
    console.log(hash);
    console.log("\n")
    console.log(wif);
    return eosjs_ecc.signHash(hash, wif);
}


//YOU DONT NEED TO READ BELOW LINES
function gen_sig_transfer(from, to, amount, memo, fee, nonce, key) {
    var data = [];
    if (to.length == 53)
        data = [
            [from, 'key'],
            [to, 'key'],
            [amount, 'asset'],
            [memo, 'string'],
            [fee, 'asset'],
            [nonce, 'int'],
            [key]
        ];
    else
        data = [
            [from, 'key'],
            [to, 'name'],
            [amount, 'asset'],
            [memo, 'string'],
            [fee, 'asset'],
            [nonce, 'int'],
            [key]
        ]

    return gen_sig(data);
}

function gen_sig_withdraw(from, to, amount, memo, fee, nonce, key) {
    var data = [
        [from, 'key'],
        [to, 'name'],
        [amount, 'asset'],
        [memo, 'string'],
        [fee, 'asset'],
        [nonce, 'int'],
        [key]
    ]

    return gen_sig(data);
}

function gen_sig_createkey(creator, newkey, memo, fee, nonce, key) {
    var data = [
        [creator, 'key'],
        [newkey, 'key'],
        [memo, 'string'],
        [fee, 'asset'],
        [nonce, 'int'],
        [key]
    ]

    return gen_sig(data);
}


function toHexBuf(data, type) {
    var ret;
    switch (type) {
        case 'key':
            ret = key2hexB(data);
            break;
        case 'string':
            ret = str2hexB(data);
            break;
        case 'asset':
            ret = assetS2hexB(data);
            break;
        case 'int':
            ret = int2hexB(data);
            break;
        case 'name':
            ret = nameS2hexB(data);
            break;
        default:
            console.log("data: " + data + ", type is not defined!");
            break;
    }
    return ret;
}

//YOU REALLY DONT NEED TO READ BELOW LINES
//key to hex
function key2hexB(key) {
    var ret = [];
    var keyD = base58.decode(key.replace("EOS", ''));
    for (i = 0; i < 33; i++) {
        ret.push(keyD[i]);
    }
    return ret;
}

//string to hex
function str2hexB(str) {
    var ret = [];
    for (i = 0; i < 256; i++)
        ret.push(str[i] == undefined ? 0 : str[i].charCodeAt());
    return ret;
}

//eos asset to hex buffer
//"1 EOS" = 10000 to buffer
//"0.05" = 500 to buffer
function assetS2hexB(amount) {
    var a = parseInt(parseFloat(amount.trim()).toFixed(4).replace(".", ''));
    var b = [0, 0, 0, 0, 0, 0, 0, 0];
    var i = 0;
    while (a > 0) {
        b[i++] = a % 256 < 128 ? a % 256 : a % 256 - 256;
        a = a >> 8;
    }

    var ret = [];
    for (i = 0; i < 8; i++)
        ret.push(b[i]);
    return ret;
}

//hex string to hex buffer
//"abcdef12341234"=>[171, 205, 239, 18, 52, 18, 52]
function strH2hexB(str) {
    var ret = [];
    for (var i = 0; i < str.length; i += 2) {
        var hex = str[i] + str[i + 1];
        ret.push(parseInt(hex, 16) > 128 ? parseInt(hex, 16) - 256 : parseInt(hex, 16));
    }
    return ret;
}

//int to hex buffer
function int2hexB(amount) {
    var b = [0, 0, 0, 0, 0, 0, 0, 0];
    var i = 0;
    while (amount > 0) {
        b[i++] = amount % 256 < 128 ? amount % 256 : amount % 256 - 256;
        amount = amount >> 8;
    }

    var ret = [];
    for (i = 0; i < 8; i++)
        ret.push(b[i]);
    return ret;
}

{
    //name string to name buffer
    //"humblefirm42" => [32, 136, 188, 110, 169, 120, 164, 110]
    function nameS2hexB(str) {
        var value = nameS2nameI(str);
        value = value.toString(16);
        var ret = [0, 0, 0, 0, 0, 0, 0, 0];
        var i = 0,
            j = 7;
        for (i = 0; i < 16; i += 2) {
            ret[j] = parseInt("0x" + value[i] + value[i + 1]);
            ret[j] = ret[j] = ret[j] > 127 ? ret[j] - 256 : ret[j];
            j--;
        }
        console.log(ret);
        return ret;
    } {
        //name string to name int
        function nameS2nameI(str) {

            var len = 0n;
            while (str[len]) ++len;

            var value = 0n;

            for (var i = 0; i <= 12; ++i) {
                c = 0n;

                if (i < len && i <= 12) c = BigInt(char2symbol(str[i]));

                if (i < 12) {
                    c &= BigInt(0x1f);
                    c <<= BigInt(64 - 5 * (i + 1));
                } else {
                    c &= BigInt(0x0f);
                }

                value |= c;
            }

            return value;
        }
        //char to base32 symbol
        function char2symbol(c) {
            if (c.charCodeAt() >= 'a'.charCodeAt() && c.charCodeAt() <= 'z'.charCodeAt())
                return (c.charCodeAt() - 'a'.charCodeAt()) + 6;
            if (c.charCodeAt() >= '1'.charCodeAt() && c.charCodeAt() <= '5'.charCodeAt())
                return (c.charCodeAt() - '1'.charCodeAt()) + 1;
            return 0;
        }
    }
}