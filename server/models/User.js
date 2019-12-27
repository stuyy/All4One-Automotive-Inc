const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true }
});

UserSchema.methods.hashPassword = async function() {
    let salt = generateSalt();
    try {
        this.password = await bcrypt.hash(this.password, salt);
    }
    catch(err) {
        return err;
    }
}

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compareSync(password, this.password);
}

const generateSalt = () => bcrypt.genSaltSync();

const User = module.exports = mongoose.model('Users', UserSchema);