// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const container = (content: string): string => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style type="text/css">
                body, p, div {
                    font-family: arial,helvetica,sans-serif;
                    font-size: 14px;
                    color: #000000;
                }
                body a {
                    color: #1188E6;
                    text-decoration: none;
                }
                p { margin: 0; padding: 0; }
                .polk-container {
                    margin: 0 auto;
                    max-width: 600px;
                }
            </style>
        </head>
        <body>
            <div class="polk-container">
                ${content}
            </div>
        </body>
    </html>
`;

export const verificationEmailTemplate = container(`
    <p>
        Welcome aboard <%= username %>!<br/><br/>

        For security purposes, please confirm your email address here - <a target="_blank" href="<%= verifyUrl %>">verify your account</a><br/><br/>

        See you soon,<br/><br/>

        Polkassembly Team
    </p>
`);

export const resetPasswordEmailTemplate = container(`
    <p>
        Hi!<br/><br/>

        The username association with this email is <%= username %><br /><br />

        If you need to reset your password, go ahead and follow this link:<br /><br />
        <a href="<%= resetUrl %>">Reset Your Password</a><br /><br />

        Just a heads up, to make sure your information is safe and secure, the above link will expire after 24 hours.<br /><br />

        If you didn't request a password change, then just ignore this message.<br /><br />

        Polkassembly Team
    </p>
`);

export const postSubscriptionMailTemplate = container(`
    <p>
        Hi <%= username %>!<br/><br/>

        <br />
        <%= authorUsername %> has commented on a post you subscribed to: <a href="<%= postUrl %>"><%= postUrl %></a>.<br /><br />

        comment: <%- content %><br /><br />

        You can deactivate this notification in your notification settings: <a href="<%= domain %>/notification-settings"><%= domain %>/notification-settings</a><br /><br />

        Polkassembly Team
    </p>
`);

export const commentMentionEmailTemplate = container(`
    <p>
        Hi <%= username %>!<br/><br/>

        <br />
        <%= authorUsername %> has mentioned you in comment: <a href="<%= postUrl %>"><%= postUrl %></a>.<br /><br />

        comment: <%- content %><br /><br />

        You can deactivate this notification in your notification settings: <a href="<%= domain %>/notification-settings"><%= domain %>/notification-settings</a><br /><br />

        Polkassembly Team
    </p>
`);

export const undoEmailChangeEmailTemplate = container(`
    <p>
        Hi <%= username %>!<br/><br/>

        Your email on polkassembly.io was changed to <%= userEmail %>.<br />
        If you did the change, then everything is fine, you have nothing to do.<br /><br />

        If you did not change your email and suspect that it is a malicious attempt, click on the following link to change your account email back to: <%= undoEmail %><br /><br />
        <a href="<%= undoUrl %>">Recover Your Email</a><br /><br />

        This link is valid for 48 hours, past this time, you will not be able to use it to recover your email. If you did not have time to click it and are a victim of a malicious email change, please open an issue on https://github.com/paritytech/polkassembly/issues/new<br /><br />

        Polkassembly Team
    </p>
`);

export const ownProposalCreatedEmailTemplate = container(`
    <p>
        Hi <%= username %>!<br/><br/>

        You have submitted a <%= type %> on chain.<br />
        Click on the following link to login to Polkassembly and edit the proposal/motion description and title: <a href="<%= postUrl %>"><%= postUrl %></a>.<br /><br />

        You can deactivate this notification in your notification settings: <a href="<%= domain %>/notification-settings"><%= domain %>/notification-settings</a><br /><br />

        Polkassembly Team
    </p>
`);

export const newProposalCreatedEmailTemplate = container(`
    <p>
        Hi <%= username %>!<br/><br/>

        There is a new <%= type %> on chain.<br />
        Click on the following link to check it out: <a href="<%= postUrl %>"><%= postUrl %></a>.<br /><br />

        You can deactivate this notification in your notification settings: <a href="<%= domain %>/notification-settings"><%= domain %>/notification-settings</a><br /><br />

        Polkassembly Team
    </p>
`);

export const reportContentEmailTemplate = container(`
    <p>
        Content Reported.<br />
        Reporter: <%= username %><br />
        Network: <%= network %><br />
        Reason:<br />
        <%= reason %> <br />
        Comments:<br />
        <%= comments %> <br />
        Report type: <%= reportType %> <br />
        id: <%= contentId %> <br />
    </p>
`);
