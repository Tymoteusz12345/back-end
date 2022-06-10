import {UserRecord} from "../records/user.record";
import {pool} from "../uttils/db";

const obj = {
    email: 'testowy123',
    password: 'hasło testowe123'
}

afterAll(async () => {
    await pool.end();
})

test('UserRecord with correct input can be build.',() => {
    expect(new UserRecord(obj)).toBeDefined();
})

test('obj with incorrect length of email or password throws.', () => {
    expect(() => new UserRecord({
        email: '11111',
        password: '2222'
    })).toThrow();
})

test('obj with empty  email or password throws.', () => {
    expect(() => new UserRecord({
        email: '',
        password: ''
    })).toThrow();
})

test('insert() method throws with existing id.', () => {
    const newUser = new UserRecord({
        email: 'testowy',
        password: 'hasło testowe',
        id: '12345'
    });
    expect( async () => {
         await newUser.insert()
    }).toThrow(Error)
})

test('insert() method returns id',async () => {
    const newUser = new UserRecord(obj);
    const data =  await newUser.insert();
    expect(data).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/)
})

test('getOne method with correct data returns true.', async () => {
    const inserUser = new UserRecord({
        email: 'testowy1234',
        password: 'hasłotestowe1234'
    });
    await inserUser.insert();
    const dataFromGetOne = await UserRecord.getOne(inserUser.email,inserUser.password)
    expect(dataFromGetOne).toBeTruthy();
})

test('getOne method with incorrect data returns false.', async () => {
    const dataFromGetOne = await UserRecord.getOne('randomvalue','randomvalue')
    expect(dataFromGetOne).toBeFalsy();
})


/*
* obj with incorrect email or password throws.
* obj with wrong length throws.
* */
