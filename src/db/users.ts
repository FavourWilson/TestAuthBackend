 import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    fullname: { type: String, requireed: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    authenciation: {
        password: { type: String, required: true, select: false },
        salt: { type:String, select:false},
        sessionToken:{type:String, select:false}
    }
});


export const UserModel = mongoose.model('user', UserSchema);
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
  'authenciation.sessionToken': sessionToken,
});
export const getUserId = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
