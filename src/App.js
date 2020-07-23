/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';
import TabBar from './TabBar';

let todoIndex = 0;

class App extends Component {

    constructor() {
        super()
        this.state = {
            inputValue: '',
            todos: [],
            type: 'All',
        }

        this.submitTodo = this.submitTodo.bind(this)
        this.toggleComplete = this.toggleComplete.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.setType = this.setType.bind(this)

    }

    inputChange(inputValue2) {
        console.log('Input Value: ', inputValue2);
        this.setState({ inputValue:inputValue2 })
    }

    submitTodo() {
        if (this.state.inputValue.match(/^\s*$/)) return
        // if (this.state.inputValue.match(/^\$/)) {
        //     return
        // }
        const todo = {
            title: this.state.inputValue,
            todoIndex,
            complete: false,

        }
        todoIndex++
        const todos = [...this.state.todos, todo]
        this.setState({
            todos: todos, inputValue: ''
        }, () => {
            console.log('state: ', this.state)
        })

    }

    deleteTodo(todoIndex) {
        let { todos } = this.state
        todos = todos.filter((todo) => todo.todoIndex !== todoIndex)
        this.setState({ todos })
    }

    toggleComplete(todoIndex) {
        let todos = this.state.todos
        todos.forEach((todo) => {
            if (todo.todoIndex === todoIndex) {
                todo.complete = !todo.complete
            }

        })
        this.setState({ todos })

    }
    setType (type) {
        this.setState({ type })
      }
    // setType(type) {
    //     this.setType = this.setType({ type })
    // }

    render() {

        const { todos, inputValue, type } = this.state
        return (
            <View style={styles.container} >
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    style={styles.content}
                >
                    <Heading />
                    <Input
                        inputValue={inputValue}
                        //TextInput onChangeText 传入了一个值给inputChange()函数
                        inputChange={(text) => this.inputChange(text)}

                    />
                    <TodoList
                        type={type}
                        todos={todos}
                        toggleComplete={this.toggleComplete}
                        deleteTodo={this.deleteTodo}
                    />
                    <Button submitTodo={this.submitTodo} />
                </ScrollView>

                <TabBar
                    type={type}
                    setType={this.setType}
                />

            </View>

        );

    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        // backgroundColor: "fffff",
        flex: 1
    },
    content: {
        flex: 1
    },

})



export default App;
