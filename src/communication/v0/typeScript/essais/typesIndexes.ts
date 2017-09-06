abstract class X<E extends string>{
    abstract net(e: E): string;
}

class Y extends X<'a' | 'b'> {
    net(e: 'a' | 'b') {
        switch (e) {
            case 'a': return 'cas a';
            case 'b': return 'cas b';
        }
    }
}


export let x: Y = new Y();
console.log(x.net('a'));