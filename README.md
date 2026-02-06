# command-center

## Environment Variables

> **Note for Vercel Deployment:** You must set the following environment variable for BOTH Production and Preview environments:
>
> ```
> COMMAND_CENTER_GATE_PASSWORD=your-secure-password-here
> ```
>
> This password is used for the "Option A" temporary gate on the root landing page.
> Without this variable, the gate will return a 500 error.