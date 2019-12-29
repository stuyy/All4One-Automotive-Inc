const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    createdBy: { type: String, required: false }
}, { timestamps: true });

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

UserSchema.methods.updatePassword = async function(newPassword) {
    try {
        let hash = await bcrypt.hash(newPassword, generateSalt());
        this.password = hash;
        this.save();
        return this;
    }
    catch(err) {
        console.log(err);
    }
}
const generateSalt = () => bcrypt.genSaltSync();

const User = module.exports = mongoose.model('Users', UserSchema);