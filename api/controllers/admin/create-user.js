module.exports = {
    friendlyName: 'Create Account',

    description: 'Create a new account.',

    inputs: {
        firstName: {
            type: 'string',
            required: true,
            maxLength: 70
        },

        lastName: {
            type: 'string',
            required: true,
            maxLength: 70
        },

        password: {
            type: 'string',
            required: true
        },

        email: {
            type: 'string',
            isEmail: true,
            required: true,
            maxLength: 191
        }
    },

    exits: {
        ok: {
            responseType: 'ok'
        },
        badRequest: {
            responseType: 'badRequest'
        },
        serverError: {
            responseType: 'serverError'
        }
    },

    fn: async (inputs, exits) => {
        const isPasswordValid = sails.helpers.isPasswordValid.with({
            password: inputs.password,
            user: {firstName: inputs.firstName, lastName: inputs.lastName, email: inputs.email}
        });

        if (isPasswordValid !== true) {
            return exits.badRequest(isPasswordValid);
        }

        User.create({
            id: 'c', // required, but auto-generated
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: inputs.password,
            role: 'user',
            email: inputs.email
        }).meta({fetch: true}).exec((err, newUser) => {
            if (err) {
                console.error(err);

                return exits.serverError(err);
            }

            return exits.ok({user: newUser});
        });
    }
};
