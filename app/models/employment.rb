class Employment < ApplicationRecord
  validates :employer_name, presence: true
  validates :employment_started_date, presence: true
  validates :employment_ended_date, presence: true
end
