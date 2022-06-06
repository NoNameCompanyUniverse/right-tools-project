module.exports = {
    apps: [
        {
            name: "right-tools-client-dev",
            script: "yarn",
            args: "yarn dev"
        },
        {
            name: "right-tools-client-prod",
            script: "yarn",
            args: "yarn start"
        }
    ]
}