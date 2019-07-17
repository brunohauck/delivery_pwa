export class Menu{
    constructor(
        public id: number,
        public name: string,
        public ingredient: string,
        public price: number,
        public img_url: string,
        public restaurant_id: number
    ){}  
}
/*
public function run()
    {
        $faker = Faker::create();
        foreach (range(1,20) as $index) {
            DB::table('menus')->insert([
                'name' => $faker->company,
                'ingredientes' => $faker->sentence($nbWords = 20, $variableNbWords = true),
                'price' => 15.00,
                'img_url' => "https://www.guiadasemana.com.br/contentFiles/image/2018/02/FEA/principal/52618_w840h0_1518708939prato-feito.jpg",
                'restaurante_id' => 1
            ]);
        }
    } */