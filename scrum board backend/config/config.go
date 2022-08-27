package config

import (
	"scrum-board-backend/entities"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DATABASE_URI string = "root:root@tcp(localhost:3306)/scrum_board"
var Database *gorm.DB

func Connect() error {
	var err error

	Database, err = gorm.Open(mysql.Open(DATABASE_URI), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		panic(err)
	}

	Database.AutoMigrate(&entities.Task{})

	return nil
}
