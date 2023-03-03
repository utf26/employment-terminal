FactoryBot.define do
  factory(:user) do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    nick_name { Faker::Name.first_name }
    email { Faker::Internet.safe_email }
    phone_number { Faker::PhoneNumber.cell_phone_in_e164 }
  end
end
