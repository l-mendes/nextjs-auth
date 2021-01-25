import AbstractServices from '../Base/AbstractServices';

export default class UserServices extends AbstractServices {

    getUsers = async () =>{
        const response = await this.service.getData('users');
        return response.data;
    }
    
}