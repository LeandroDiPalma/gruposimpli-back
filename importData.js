import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Dealer from './models/Dealer.js';
import Vehicle from './models/Vehicle.js';
import Accessory from './models/Accessory.js';
import Post from './models/Post.js';
import Lead from './models/Lead.js';

const MONGO_URI = 'mongodb://localhost:27017/myapp';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvFilePathDealer = path.join(__dirname, './csv/dealerData.csv');
const csvFilePathVehicle = path.join(__dirname, './csv/vehicleData.csv');
const csvFilePathAccessory = path.join(__dirname, './csv/accessoryData.csv');
const csvFilePathPost = path.join(__dirname, './csv/postData.csv');
const csvFilePathLead = path.join(__dirname, './csv/leadData.csv');


const loadData = async () => {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    try {
        const resultsDealer = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePathDealer)
                .pipe(csv())
                .on('data', (data) => resultsDealer.push(data))
                .on('error', reject)
                .on('end', resolve);
        });

        await Dealer.deleteMany({});
        const createdDealers = await Dealer.insertMany(resultsDealer);
        console.log('Dealers added successfully');

        const resultsVehicle = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePathVehicle)
                .pipe(csv())
                .on('data', (data) => {
                    const randomDealerIndex = Math.floor(Math.random() * createdDealers.length);
                    resultsVehicle.push({ ...data, dealer: createdDealers[randomDealerIndex]._id });
                })
                .on('error', reject)
                .on('end', resolve);
        });

        await Vehicle.deleteMany({});
        const createdVehicles = await Vehicle.insertMany(resultsVehicle);
        console.log('Vehicles added successfully');

        const resultsAccessory = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePathAccessory)
                .pipe(csv())
                .on('data', (data) => {
                    const randomDealerIndex = Math.floor(Math.random() * createdDealers.length);
                    resultsAccessory.push({ ...data, dealer: createdDealers[randomDealerIndex]._id });
                })
                .on('error', reject)
                .on('end', resolve);
        });

        await Accessory.deleteMany({});
        const createdAccessories = await Accessory.insertMany(resultsAccessory);
        console.log('Accessories added successfully');


        const resultsPost = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePathPost)
                .pipe(csv())
                .on('data', (data) => {
                    const randomDealerIndex = Math.floor(Math.random() * createdDealers.length);
                    const randomVehicleIndex = Math.random() < 0.5 ? Math.floor(Math.random() * resultsVehicle.length) : -1;
                    const randomAccessoryIndex = Math.random() < 0.5 ? Math.floor(Math.random() * resultsAccessory.length) : -1;
                    resultsPost.push({
                        title: data.title,
                        content: data.content,
                        dealer: createdDealers[randomDealerIndex]._id,
                        vehicle: randomVehicleIndex > -1 ? createdVehicles[randomVehicleIndex]._id : undefined,
                        accessory: randomAccessoryIndex > -1 ? createdAccessories[randomAccessoryIndex]._id : undefined
                    });
                })
                .on('error', reject)
                .on('end', resolve);
        });

        await Post.deleteMany({});
        const createdPosts = await Post.insertMany(resultsPost);
        console.log('Posts added successfully');

        const resultsLead = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePathLead)
                .pipe(csv())
                .on('data', async (data) => {
                    const randomDealerIndex = Math.floor(Math.random() * createdDealers.length);

                    const posts = await Post.find({ dealer: createdDealers[randomDealerIndex]._id });
                    const post = posts.length > 0 ? posts[Math.floor(Math.random() * posts.length)] : null;

                    console.log(post)
                    resultsLead.push({
                        email: data.email,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        dealer: createdDealers[randomDealerIndex]._id,
                        post: post._id
                    });

                })
                .on('error', reject)
                .on('end', resolve);
        });

        await Lead.deleteMany({});
        const createdLeads = await Lead.insertMany(resultsLead);
        console.log('Leads added successfully');

        const dealerUpdates = {};

        for (const vehicle of createdVehicles) {
            if (!dealerUpdates[vehicle.dealer]) {
                dealerUpdates[vehicle.dealer] = { vehicles: [], posts: [], accessories: [], leads: [] };
            }
            dealerUpdates[vehicle.dealer].vehicles.push(vehicle._id);
        }

        for (const post of createdPosts) {
            if (!dealerUpdates[post.dealer]) {
                dealerUpdates[post.dealer] = { vehicles: [], posts: [], accessories: [], leads: [] };
            }
            dealerUpdates[post.dealer].posts.push(post._id);
        }

        for (const accessory of createdAccessories) {
            if (!dealerUpdates[accessory.dealer]) {
                dealerUpdates[accessory.dealer] = { vehicles: [], posts: [], accessories: [], leads: [] };
            }
            dealerUpdates[accessory.dealer].accessories.push(accessory._id);
        }

        for (const lead of createdLeads) {
            if (!dealerUpdates[lead.dealer]) {
                dealerUpdates[lead.dealer] = { vehicles: [], posts: [], accessories: [], leads: [] };
            }
            dealerUpdates[lead.dealer].leads.push(lead._id);
        }

        const bulkOps = Object.keys(dealerUpdates).map(dealerId => ({
            updateOne: {
                filter: { _id: dealerId },
                update: {
                    $push: {
                        vehicles: { $each: dealerUpdates[dealerId].vehicles },
                        posts: { $each: dealerUpdates[dealerId].posts },
                        accessories: { $each: dealerUpdates[dealerId].accessories },
                        leads: { $each: dealerUpdates[dealerId].leads }
                    }
                }
            }
        }));

        if (bulkOps.length > 0) {
            const result = await Dealer.bulkWrite(bulkOps);
            console.log('Bulk update result:', result);
        }

        const dealersWithDetails = await Dealer.find()
            .populate('vehicles')
            .populate('accessories')
            .populate({
                path: 'posts',
                populate: {
                    path: 'vehicle accessory'
                }
            })
            .populate({
                path: 'leads',
                populate: {
                    path: 'post'
                }
            });
        console.log("Dealers with vehicles, accessories, posts, and leads:", dealersWithDetails);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

loadData();
