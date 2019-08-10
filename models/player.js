module.exports = () => class Player{
    name:'';
    hp:Number;
    action:Object;
    role:'Bard|Warlord|Warrior|Mage|Druid|Priest|Warlock|Saint|Paladin|Plut|Expediter|Charodei;
    race:'' ;
    level:Number;
    exp:Number;
    religion:"";
    age:Number;
    height;
    weight;
    eyes;
    skin;
    hair;
    chars :{
        power
        agility
        healthy
        intelegence
        mudrost
        charsima
    };
    abbilities:[];
    spasbroski;
    bonusOfMastery;
    inspiring;
    initiate;
    speed;
    CD;
    Hits;
    boneOfCube;


};
/*
Имя персонажа (любое имя)
Имя игрока (любое имя)
Предыстория (“И Тика Вейлан, и Артемис Энтрери провели свои детские годы как беспризорники. Позже Тика подрабатывала в баре, но это не изменило её привычек, что даёт ей владе- ние навыками Ловкость рук и Скрытность, а также владе- ние воровскими инструментами. Артемис пошёл по пути преступности, что даёт ему владение навыками Обман и Скрытность, а также владение воровскими инструментами и инструментами отравителя.”)
Класс (Бард, Варвар, Воин, Волшебник, Друид, Жрец, Колду, Монах, Паладин, Плут, Следопыт, Чародей)
Раса (Двард, Эльф, Полурослик, Человек, Драконорожденный, Гном, Полуэльф, Полуорк, Тифлинг)
Уровень (1 и больше)
Опыт (0 и больше)
Мировоззрение (Законно-доброе, Нейтрально-доброе, Хаотично-доброе, Законно-нейтральное, Нейтральное, Хаотично-нейтральное, Законно-злое, Нейтрально-злое, Хаотично-злое)
Возраст (любое число)
Рост (любое число)
Вес (любое число)
Глаза (описание цвета, формы (?))
Кожа (цвет(?))
Волосы (прическа, цвет)
Характеристики: (числа и модификаторы (-5 - +10) на основе значений)
    Сила
    Ловкость
    Телосложение
    Интеллект
    Мудрость
    Харизма
Навыки: (числа, часть навыков должны быть недоступны)
    Акробатика (Лов)
    Анализ (Инт)
    Атлетика (Сил)
    Внимательность (Мдр)
    Выживание (Мдр)
    Выступление (Хар)
    Запугивание (Хар)
    История (Инт)
    Ловкость рук (Лов)
    Магия (Инт)
    Медицина (Мдр)
    Обман (Хар)
    Природа (Инт)
    Проницательность (Мдр)
    Религия (Инт)
    Скрытность (Лов)
    Убеждение (Хар)
    Уход за животными (Мдр)
    Спасброски (числа, часть может быть недоступна аналогично навыкам)
    Бонус мастерства (число)
    Вдохновение (видимо, число)
    Инициатива (видимо, число)
    Скорость (число)
    КД (видимо, число)
    Хиты: максимум, текущие, временные (числа)
    Кость хитов (описание кубика)
Спасброски смерти (3 раза отмечается успех и провал, две шкалы(?))
Атаки и заклинания, для каждой: (количество неограниченно)
Название
Бонус атаки (число)
Урон/вид (текст)
Пассивная мудрость (внимательность) (число)
Снаряжение:
Монеты: (числа)
Медная (сокращается до ММ)
Серебряная (СМ)
Электрумовая (ЭМ)
Золотая (ЗМ)
Платиновая (ПМ)
Оружие, доспехи, етс (проще всего предоставить игрокам возможность текстово описывать все параметры, хотя можно и вынести отдельно, чтобы было покрасивее)
Черты характера (текст)
Идеалы (текст)
Привязанности (текст)
Слабости (текст)
Умения и особенности (текст)
Прочие владения и языки (текст)
Внешний вид персонажа (желательна возможность загрузить изображение, обязательно текстовое описание)
Союзники и организации (текст)
Дополнительные особенности и умения (текст)
Сокровища (текст)
Заметки (текст; в листе персонажа такого нет, но я предлагаю добавить это, чтобы какие-то зависящие от конкретной игры вещи или что-то не из правил тоже можно было внести)

 */