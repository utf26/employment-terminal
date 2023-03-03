require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "💽 Running Faker..."
puts "=========================================================================================================\n"

number_of_records = 50

if User.all.blank?
  number_of_records.times do
    User.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      nick_name: Faker::Name.first_name,
      email: Faker::Internet.safe_email,
      phone_number: Faker::PhoneNumber.cell_phone_in_e164
    )
  end
end

if Employment.all.blank?
  number_of_records.times do
    Employment.create(
      employer_name: Faker::Name.first_name,
      employment_started_date: Faker::Date.between(from: '2015-01-01', to: '2018-01-01'),
      employment_ended_date: Faker::Date.between(from: '2020-01-01', to: '2023-01-01')
    )
  end
end

puts "💾 Fake Records Created"
puts "=========================================================================================================\n"
