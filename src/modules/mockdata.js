export default async function (sequelize) {
  const users = await sequelize.models.users.build([
    { fullname: "Olim Qodirov", contact: "+998990981231" },
    { fullname: "Shoxjahon Abdullajonov", contact: "+998336547945" },
    { fullname: "Yo'ldosh Xamroqulov", contact: "+998971236856" },
  ])

  const foods = await sequelize.models.foods.build([
    { name: "Lavash", price: 22000 }, 
    { name: "Gamburger", price: 24000 }, 
    { name: "Big Lavash", price: 24000 },
    { name: "Shaurma", price: 30000 } 
  ])

  await Promise.all(users.map(async user => await user.save()))
  await Promise.all(foods.map(async food => await food.save()))
}