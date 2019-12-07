package main

import "fmt"

func main() {
	listofints := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	for i := range listofints {
		if i%2 == 0 {
			fmt.Println(listofints[i], "is even")
		} else {
			fmt.Println(listofints[i], "is odd")
		}
	}
}
