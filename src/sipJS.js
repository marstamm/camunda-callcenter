import { SimpleUser } from "sip.js/lib/platform/web";

// create audio element
var audio = document.createElement('audio');
audio.id = 'remoteAudio';
document.body.appendChild(audio);


// Helper function to get an HTML audio element
function getAudioElement(id) {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLAudioElement)) {
        throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
}
// Helper function to wait
async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// Main function
async function main() {
    const server = "wss://127.0.0.1:8089/ws";
    const aor = "sip:1060@127.0.0.1";
    const authorizationUsername = '1060';
    const authorizationPassword = 'password';
    const options = {
        aor,
        media: {
            remote: {
                audio: getAudioElement("remoteAudio")
            }
        },
        userAgentOptions: {
            authorizationPassword,
            authorizationUsername,
        }
    };
    const simpleUser = new SimpleUser(server, options);
    simpleUser.delegate = {
        onCallReceived: async () => {
            await simpleUser.answer();
        }
    };
    // Connect to server
    await simpleUser.connect();
    // Register to receive inbound calls (optional)
    await simpleUser.register();

    window.call = async (number) => {
        console.warn(`calling sip:${number}@127.0.0.1`);
        await simpleUser.call(`sip:${number}@127.0.0.1`);
    }

    window.hangup = async () => {
        console.warn('hangup');
        await simpleUser.hangup();    
    }
}
// Run it
main()
    .then(() => console.log(`Success`))
    .catch((error) => console.error(`Failure`, error));
