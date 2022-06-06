module.exports = {
    apps: [
        {
            name: "right-tools-client-dev",
            script: "npm",
            args: "run dev"
        },
        {
            name: "right-tools-client-prod",
            script: "npm",
            args: "run start"
        }
    ]
}