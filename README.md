Learnings:

-   Library https://github.com/typestack/class-transformer provides functions for serialising and
    deserialising classes. There may be some interesting reference code there. It doesn't cover
    cyclic dependencies or serialise by reference. It also requires specifying the type of
    referenced objects, whereas I may be able to infer the type based on prototype / constructor
    (see https://www.geeksforgeeks.org/how-to-get-the-class-name-of-an-object-in-javascript/)
-   Can use Object.assign() to restore a class
