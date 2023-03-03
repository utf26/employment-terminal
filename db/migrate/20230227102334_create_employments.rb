class CreateEmployments < ActiveRecord::Migration[7.0]
  def change
    create_table :employments do |t|
      t.string :employer_name
      t.datetime :employment_started_date
      t.datetime :employment_ended_date

      t.timestamps
    end
  end
end
