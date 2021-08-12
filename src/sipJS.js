import { SimpleUser } from "sip.js/lib/platform/web";


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
    const destination = "sip:100@127.0.0.1";
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
    // Place call to the destination

    console.warn('calling');

    await simpleUser.call(destination);
    // Wait some number of milliseconds
    await wait(5000);

    // Hangup call
    // console.warn('hangup');
    // await simpleUser.hangup();
}
// Run it
main()
    .then(() => console.log(`Success`))
    .catch((error) => console.error(`Failure`, error));
