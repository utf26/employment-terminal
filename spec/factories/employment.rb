FactoryBot.define do
  factory(:employement) do
    employer_name { Faker::Name.first_name }
    employment_started_date { Faker::Date.between(from: '2015-01-01', to: '2018-01-01') }
    employment_ended_date { Faker::Date.between(from: '2020-01-01', to: '2023-01-01') }
  end
end
