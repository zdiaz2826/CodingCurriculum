package main

import "fmt"

// to meet the  type shape requirements the type must have a function getArea() that returns a float64
type shape interface {
	getArea() float64
}
type tirangle struct {
	height float64
	base   float64
}
type square struct {
	sideLength float64
}

func main() {

	t := tirangle{height: 5, base: 6}
	s := square{sideLength: 4}

	printArea(t)
	printArea(s)

}

func printArea(s shape) {
	fmt.Println(s.getArea())
}

func (t tirangle) getArea() float64 {
	return 0.5 * t.base * t.height

}

func (s square) getArea() float64 {
	return s.sideLength * s.sideLength

}
