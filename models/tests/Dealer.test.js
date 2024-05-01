import mongoose from 'mongoose';
import Dealer from '../Dealer.js';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;


describe('Dealer Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(MONGO_URI);
    });

    it('create & save dealer successfully', async () => {
        const dealerData = { name: 'Test Dealer', location: 'Test City' };
        const validDealer = new Dealer(dealerData);
        const savedDealer = await validDealer.save();
        expect(savedDealer._id).toBeDefined();
        expect(savedDealer.name).toBe(dealerData.name);
    }, 10000);

    afterEach(async () => {
        await Dealer.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
