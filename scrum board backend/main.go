package main

import (
	"log"

	"scrum-board-backend/config"
	"scrum-board-backend/entities"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	config.Connect()

	app.Post("/createTask", func(c *fiber.Ctx) error {
		task := new(entities.Task)

		if err := c.BodyParser(task); err != nil {
			return c.Status(503).SendString(err.Error())
		}

		config.Database.Create(&task)
		return c.Status(200).JSON(task)
	})

	log.Fatal(app.Listen(":3000"))
}
