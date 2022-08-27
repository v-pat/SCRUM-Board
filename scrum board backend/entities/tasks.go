package entities

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	ID      string `json:"id"`
	Name    string `json:"name"`
	Assigne string `json:"assignee"`
	status  int    `json:"status"`
}
